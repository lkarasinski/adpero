import React from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`
	font-size: 1.3em;
	margin-left: 0.5rem;
	list-style: none;
	font-weight: 500;
`;

const ColorSquare = styled.div`
	background-color: #6730cf;
	font-size: 1.5em;
	width: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 1rem;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	transition: all 0.5s;
	cursor: pointer;
`;

const ListElement = ({
	isHovered,
	emoji,
	content,
	setCurrentCategory,
}: {
	isHovered: boolean;
	emoji: React.ReactElement;
	content: string;
	setCurrentCategory: Function;
}) => {
	return (
		<Wrapper onClick={() => setCurrentCategory()}>
			<ColorSquare>{emoji}</ColorSquare>
			<StyledLi>{content}</StyledLi>
		</Wrapper>
	);
};

export default ListElement;