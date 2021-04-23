import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	/* all: unset; */
	background-color: #6730cf;
	color: white;
	margin: 4rem;
	border: none;
	border-radius: 1.5rem;
	font-weight: bold;
	font-size: 1.3em;

	padding: calc(1.5rem - 5px) calc(4rem - 5px);
	border: 5px solid transparent;

	transition: background-color 0.1s ease-in;

	:hover {
		background-color: transparent;
		color: #6730cf;
		border: 5px solid #6730cf;
	}
`;

const MediumButton = ({ ...props }) => {
	return (
		<StyledButton onClick={props.onClick}>{props.children}</StyledButton>
	);
};

export default MediumButton;
