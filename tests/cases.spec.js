import { expect } from 'chai';
import CasesHelper from '../helpers/cases.helper';
import CountriesHelper from '../helpers/countries.helper';

describe('cases per country', function(){
    const casesHelper = new CasesHelper();
    const countriesHelper = new CountriesHelper();
    let countryCode;

    before(async function() {
        await countriesHelper.get();
        countryCode = countriesHelper.response.body[Math.floor(Math.random()*countriesHelper.response.body.length)];
        await casesHelper.get(countryCode);

    });

    it('response status code is 200', async function() {
        expect(casesHelper.response.statusCode).to.eq(200);
    });

    it('response has an array with at least one item', async function() {
        expect(casesHelper.response.body.length).to.be.at.least(1);
    });

    it('response has randomly chosen country code', async function() {
        for(let caseData of casesHelper.response.body){
            expect(caseData['Country_code']).to.eq(countryCode);
        }
    });
});