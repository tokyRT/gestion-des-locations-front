import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ErrorIcon from '@mui/icons-material/Error';

export default function LocataireActuel(props) {
    return (
        <div className="locataireActuel">
            <h3>Locataire actuel: </h3>
            {
                props.appart.locataire ?

                    <Chip
                        color="primary"
                        label={props.appart.locataire.nom}
                        avatar={<Avatar>{props.appart.locataire.nom[0].toUpperCase()}</Avatar>}
                    />

                    :

                    <Chip color="warning" label="aucun" icon={<ErrorIcon />} />
            }
        </div>
    );
}