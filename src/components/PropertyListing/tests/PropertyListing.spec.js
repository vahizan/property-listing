import React from 'react';
import {shallow, mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import PropertyListing from '../PropertyListing';
import { testPropertyListings } from './testData';
import axios from '../../../axios';

jest.mock('../../../axios');

describe('PropertyListing', () => {
    beforeEach(() => {
         axios.get.mockResolvedValue({
            data: testPropertyListings,
            status: 200,
            statusText: 'OK',
        });
    })
    afterEach(() => {
       jest.restoreAllMocks();
    });

    it('should render without crashing', () => {
        const wrapper = shallow(<PropertyListing/>);
        expect(wrapper.find('.PropertyListing')).toHaveLength(1);
    });

    it('should render right amount of property cards', async () => {
        let wrapper = undefined;
        await act(() => {
            wrapper = mount(<PropertyListing />);
        });
        wrapper.update()
        expect(wrapper.find('PropertyCard')).toHaveLength(testPropertyListings.length);
    });

    describe("fetch property listings",() => {
        it('should render data fetched from backend correctly', async () =>{
            let wrapper = undefined;
            await act(() => {
                wrapper = mount(<PropertyListing />);
            });
            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(axios.get).toHaveBeenCalledWith('properties');
        })
    })
});
