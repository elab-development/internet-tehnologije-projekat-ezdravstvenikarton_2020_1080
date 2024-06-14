import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DrugsList.css';

const DrugsList = () => {
    const [drugs, setDrugs] = useState([]);
    const [expandedDrugIndex, setExpandedDrugIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDrugs = async () => {
            // Pokušaj učitavanja podataka iz localStorage
            const cachedDrugs = localStorage.getItem('drugs');
            if (cachedDrugs) {
                setDrugs(JSON.parse(cachedDrugs));
                return;
            }

            try {
                const response = await axios.get('https://api.fda.gov/drug/label.json', {
                    params: {
                        limit: 10 // Ograničavamo broj rezultata na 10 za preglednost
                    }
                });
                setDrugs(response.data.results);
                // Keširanje podataka u localStorage
                localStorage.setItem('drugs', JSON.stringify(response.data.results));
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        };

        fetchDrugs();
    }, []);

    const handleExpandClick = (index) => {
        setExpandedDrugIndex(index === expandedDrugIndex ? null : index);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDrugs = drugs.filter(drug =>
        drug.openfda.brand_name && drug.openfda.brand_name[0].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="drugs-list">
            <h1>Drugs List</h1>
            <input
                type="text"
                placeholder="Search by brand name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredDrugs.length === 0 ? (
                <p>No drugs found</p>
            ) : (
                filteredDrugs.map((drug, index) => (
                    <div key={index} className="drug-card">
                        <h2>{drug.openfda.brand_name ? drug.openfda.brand_name[0] : 'No Brand Name'}</h2>
                        {expandedDrugIndex === index ? (
                            <>
                                <p><strong>Generic Name:</strong> {drug.openfda.generic_name ? drug.openfda.generic_name[0] : 'No Generic Name'}</p>
                                <p><strong>Manufacturer:</strong> {drug.openfda.manufacturer_name ? drug.openfda.manufacturer_name[0] : 'No Manufacturer'}</p>
                                <p><strong>Purpose:</strong> {drug.purpose ? drug.purpose[0] : 'No Purpose Information'}</p>
                                <p><strong>Warnings:</strong> {drug.warnings ? drug.warnings[0] : 'No Warnings'}</p>
                                <p><strong>Dosage and Administration:</strong> {drug.dosage_and_administration ? drug.dosage_and_administration[0] : 'No Dosage Information'}</p>
                                <p><strong>Inactive Ingredients:</strong> {drug.inactive_ingredient ? drug.inactive_ingredient.join(', ') : 'No Inactive Ingredients'}</p>
                                <p><strong>Route:</strong> {drug.openfda.route ? drug.openfda.route.join(', ') : 'No Route Information'}</p>
                                <button onClick={() => handleExpandClick(index)}>Less</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Generic Name:</strong> {drug.openfda.generic_name ? drug.openfda.generic_name[0] : 'No Generic Name'}</p>
                                <p><strong>Purpose:</strong> {drug.purpose ? drug.purpose[0].substring(0, 50) + '...' : 'No Purpose Information'}</p>
                                <button onClick={() => handleExpandClick(index)}>More</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default DrugsList;
