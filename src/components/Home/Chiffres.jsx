import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Chiffres(props) {
	return (
		<Wrapper>
			<div className="chiffre appartement">
				<h2>Appartements</h2>
				<strong>{props.chiffres.appartements}</strong>
				<div className="btn-section">
					<Link to="/appartements" className='voir-tout'>Voir tout</Link>
				</div>
			</div>
			<div className="chiffre locataire">
				<h2>Locataires</h2>
				<strong>{props.chiffres.locataires}</strong>
				<div className="btn-section">
					<Link to="/appartements" className='voir-tout'>Voir tout</Link>
				</div>
			</div>
			<div className="chiffre ca">
				<h2>Chiffre d'affaire</h2>
				<strong>{props.chiffres.caTotal} Ar</strong>
				<div className="btn-section">
					<Link to="/appartements" className='voir-tout'>Voir tout</Link>
				</div>
			</div>
		</Wrapper>
	);
}
const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
	.chiffre{
		width: 400px;
		border-radius: 20px;
		height: 200px;
		color: white;
		padding: 20px;
		display: flex;
		flex-direction: column;
		h2{
			margin: 0;
		}
		strong{
			font-size: 5em;
		}
		.btn-section{
			display: flex;
			justify-content: right;
			.voir-tout{
				border: 2px solid white;
				border-radius: 10px;
				color: white;
				text-decoration: none;
				padding: 8px 10px;
				text-transform: lowercase;
				font-size: .9em;
				font-weight: bold;
			}

		}
		&.appartement{
			background-color: #4158D0;
			background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
		}
		&.locataire{
			background-color: #FFE53B;
			background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 100%);
		}
		&.ca{
			background: rgb(0,171,226);
			background: linear-gradient(147deg, rgba(0,171,226,1) 0%, rgba(9,58,170,1) 100%);
			strong{
				font-size: 3em;
				margin-bottom: 40px;
			}
		}
	}
`;