import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Chiffres from '../components/Home/Chiffres';
import Histogramme from '../components/Home/Histogramme';
import Donnut from '../components/Home/Donnut';

export default function Home() {
	return (
		<Main>
			{/* <h1>Tableau de bord</h1> */}
			<Chiffres />
			<div className="chiffre-d-affaire">
				<h2>
					Chiffre d'affaire par client
				</h2>
				<div className="charts">
					<Histogramme />
					<Donnut />
				</div>
			</div>
		</Main>
	);
}
const Main = styled.div`
	padding: 50px 5%;
	.chiffre-d-affaire{
		margin-top: 50px;
		h2{
			margin-bottom: 30px;
		}
	}
	.charts{
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
	}
`;