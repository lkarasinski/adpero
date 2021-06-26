/* eslint-disable */

import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import {
	Details,
	Expense,
	ExpenseFormValues,
} from '../../../../utilities/interfaces/Expenses';
import firebase from '../../../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import * as yup from 'yup';
import { TinyButton } from 'components/Buttons/TinyButton';
import {
	AddDetailButton,
	RemoveDetailButton,
} from 'components/Expenses/shared/styledComponents';

interface Props {
	docRef: firebase.firestore.DocumentReference<
		firebase.firestore.DocumentData
	>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const detailsSchema = {
	label: yup.string().required().max(24),
	type: yup.string().required(),
	value: yup.mixed().when('type', {
		is: 'Price',
		then: yup.number().required(),
		otherwise: yup.string().required(),
	}),
	currency: yup.string().when('type', {
		is: 'Price',
		then: yup
			.string()
			.required()
			.test(
				'len',
				'Enter currency code. For example: USD, GBP',
				(val) => val?.length === 3
			),
	}),
};

const validationSchema = yup.array().of(
	yup.object({
		title: yup.string().required().max(24),
		details: yup.array().of(yup.object().shape(detailsSchema)),
	})
);

/**
 * Creates a form that allows editing of a firestore document
 *  @param {firebase.firestore.DocumentReference<firebase.firestore.DocumentData>} docRef reference to the document that you want to edit
 *  @param { React.Dispatch<React.SetStateAction<boolean>>} setIsEditing state update function for isEditing
 */
export const ExpenseForm: React.FC<Props> = ({ docRef, setIsEditing }) => {
	const [firestoreData, loading] = useDocument(docRef);
	if (loading || !firestoreData) {
		return <div>Loading</div>;
	}

	const initialValues: ExpenseFormValues = firestoreData?.data()
		?.expenses ?? [
		{
			title: '',
			details: [{ label: '', value: '', type: '', currency: '' }],
		},
	];

	const updateDatabase = (values: ExpenseFormValues) => {
		docRef.get().then((snap) => {
			const dbData = snap.data();
			const copy = dbData ?? {};
			copy.expenses = values;
			docRef.set(copy);
		});
		setIsEditing(false);
	};

	const addNewExpense = (values: ExpenseFormValues): ExpenseFormValues => {
		const copy = values;
		copy.push({
			title: '',
			details: [
				{
					label: '',
					value: '',
					type: '',
					currency: '',
				},
			],
		});
		return copy;
	};

	const addNewDetail = (values: ExpenseFormValues, index: number) => {
		const copy = values;
		copy[index].details.push({
			label: '',
			value: '',
			type: '',
			currency: '',
		});
		return copy;
	};

	const removeExpense = (
		values: ExpenseFormValues,
		index: number,
		setValues: (values: ExpenseFormValues) => void
	): void => {
		setValues([...values.filter((expense) => expense !== values[index])]);
	};

	const removeDetail = (
		values: ExpenseFormValues,
		i: number,
		j: number,
		setValues: (values: ExpenseFormValues) => void
	): void => {
		const details = values
			.filter((expense) => expense === values[i])[0]
			.details.filter(
				(detail: Details) => detail !== values[i].details[j]
			);
		const result = [...values];
		result[i].details = details;
		setValues([...result]);
	};
	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={(values: ExpenseFormValues) => updateDatabase(values)}
				validationSchema={validationSchema}
			>
				{({
					values,
					setValues,
				}: {
					values: ExpenseFormValues;
					setValues: (values: ExpenseFormValues) => void;
				}) => {
					return (
						<>
							<Form>
								<TinyButton
									type="button"
									onClick={() => {
										setValues([...addNewExpense(values)]);
									}}
								>
									Add new expense
								</TinyButton>

								{values.map((expense: Expense, i: number) => (
									<div key={i} style={{ margin: '1em 0' }}>
										<Field name={`[${i}].title`} />
										<TinyButton
											onClick={() =>
												removeExpense(
													values,
													i,
													setValues
												)
											}
										>
											Remove this expense
										</TinyButton>
										{expense.details.map((_, j: number) => {
											return (
												<div
													key={j}
													style={{
														margin: '0.5em 0 0 0 ',
													}}
												>
													<Field
														name={`[${i}].details[${j}].label`}
													/>
													<Field
														name={`[${i}].details[${j}].value`}
													/>
													{values[i].details[j]
														.type === 'Price' ? (
														<Field
															name={`[${i}].details[${j}].currency`}
														/>
													) : null}
													<Field
														name={`[${i}].details[${j}].type`}
														as="select"
													>
														<option></option>
														<option>Text</option>
														<option>Price</option>
														<option>Link</option>
													</Field>
													<RemoveDetailButton
														type="button"
														onClick={() => {
															removeDetail(
																values,
																i,
																j,
																setValues
															);
														}}
													/>
												</div>
											);
										})}
										<AddDetailButton
											type="button"
											onClick={() => {
												setValues([
													...addNewDetail(values, i),
												]);
											}}
										>
											Add new detail
										</AddDetailButton>
									</div>
								))}

								<TinyButton type="submit">Submit</TinyButton>
							</Form>
						</>
					);
				}}
			</Formik>
		</div>
	);
};
