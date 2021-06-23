import React, {useState, useEffect} from 'react';
import PropertyCard from '../PropertyCard';
import axios from '../../axios';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get('properties').then((response) => {
            setListings(response.data);
        });
    }, [setListings]);

    return (
        <div className="PropertyListing">
            {
                listings
                    .map((property, index) => <PropertyCard key={index} {...property}/>)
            }
        </div>
    )
};

export default PropertyListing;
