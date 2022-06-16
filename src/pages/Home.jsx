import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Chiffres from '../components/Home/Chiffres';
import Histogramme from '../components/Home/Histogramme';
import Donnut from '../components/Home/Donnut';
import axios from 'axios';

export default function Home() {
	const [chiffres, setChiffres] = useState(null);
	const [ca, setCa] = useState(null);
	useEffect(() => {
		axios.get("/stat").then(res => {
			setChiffres({
				appartements: res.data.appartements,
				locataires: res.data.locataires,
				caTotal: res.data.caTotal
			});
			setCa(res.data.caParClient);
		})
	}, []);
	return (
		<Main>
			{/* <h1>Tableau de bord</h1> */}
			{
				chiffres ? <Chiffres chiffres={chiffres} /> : ""
			}
			{
				ca ?
					<div className="chiffre-d-affaire">
						<h2>
							Chiffre d'affaire par client
						</h2>
						<div className="charts">
							<Histogramme ca={ca} />
							<Donnut ca={ca} />
						</div>
					</div> : ""
			}
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