import { test, describe, expect } from '@jest/globals'; // https://jestjs.io/docs/expect
import { strict as assert } from 'node:assert';         // https://nodejs.org/api/assert.html

import { finnishDateString } from '../dateFormatter';   // the function to be tested


const january1 = new Date('2024-01-01T00:00:00Z');
const february1 = new Date('2024-02-01T00:00:00Z');
const december31 = new Date('2023-12-31T00:00:00Z');
const tammikuu2030 = new Date('2030-01-15T12:00:00.000Z');

const maanantai = new Date('2025-04-21T00:00:00Z');
const tiistai = new Date('2025-04-22T00:00:00Z');
const keskiviikko = new Date('2025-04-23T00:00:00Z');
const torstai = new Date('2025-04-24T00:00:00Z');
const perjantai = new Date('2025-04-25T00:00:00Z');
const lauantai = new Date('2025-04-26T00:00:00Z');
const sunnuntai = new Date('2025-04-27T00:00:00Z');

const karkauspaivahelmikuunvika = new Date('2024-02-29T00:00:00Z'); //torstai
const karkauspaivamaaliskuuneka = new Date('2024-03-01T00:00:00Z'); //perjantai


const tammi = new Date('2025-01-01T00:00:00Z');
const helmi = new Date('2025-02-01T00:00:00Z');
const maalis = new Date('2025-03-01T00:00:00Z');
const huhti = new Date('2025-04-01T00:00:00Z');
const touko = new Date('2025-05-01T00:00:00Z');
const kesä = new Date('2025-06-01T00:00:00Z');
const heinä = new Date('2025-07-01T00:00:00Z');
const elo = new Date('2025-08-01T00:00:00Z');
const syys = new Date('2025-09-01T00:00:00Z');
const loka = new Date('2025-10-01T00:00:00Z');
const marras = new Date('2025-11-01T00:00:00Z');
const joulu = new Date('2025-12-01T00:00:00Z');


test('Tammikuun ensimmäinen', () => {
    assert.equal(finnishDateString(january1), 'maanantai 1. tammikuuta 2024');
});

test('Joulukuun viimeinen', () => {
    assert.equal(finnishDateString(december31), 'sunnuntai 31. joulukuuta 2023');
});

test('Tammikuun 15. päivä 2030', () => {
    assert.equal(finnishDateString(tammikuu2030), 'tiistai 15. tammikuuta 2030');
});

test('Helmikuun 1. päivä 2024', () => {
    assert.equal(finnishDateString(february1), 'torstai 1. helmikuuta 2024');
});


// Testataan viikonpäivien tulostukset
test('Viikonpäivät: maanantai', () => {
    assert.equal(finnishDateString(maanantai), 'maanantai 21. huhtikuuta 2025');
});

test('Viikonpäivät: tiistai', () => {
    assert.equal(finnishDateString(tiistai), 'tiistai 22. huhtikuuta 2025');
});

test('Viikonpäivät: keskiviikko', () => {
    assert.equal(finnishDateString(keskiviikko), 'keskiviikko 23. huhtikuuta 2025');
});

test('Viikonpäivät: torstai', () => {
    assert.equal(finnishDateString(torstai), 'torstai 24. huhtikuuta 2025');
});

test('Viikonpäivät: perjantai', () => {
    assert.equal(finnishDateString(perjantai), 'perjantai 25. huhtikuuta 2025');
});

test('Viikonpäivät: lauantai', () => {
    assert.equal(finnishDateString(lauantai), 'lauantai 26. huhtikuuta 2025');
});

test('Viikonpäivät: sunnuntai', () => {
    assert.equal(finnishDateString(sunnuntai), 'sunnuntai 27. huhtikuuta 2025');
});

// Testataan karkauspäivän tulostukset
test('Karkauspäivä: helmikuun viimeinen', () => {26
    assert.equal(finnishDateString(karkauspaivahelmikuunvika), 'torstai 29. helmikuuta 2024');
});

test('Karkauspäivä: maaliskuun ensimmäinen', () => {
    assert.equal(finnishDateString(karkauspaivamaaliskuuneka), 'perjantai 1. maaliskuuta 2024');
});

// Testataan kuukauden tulostukset
test('Kuukaudet: tammikuu', () => {
    assert.equal(finnishDateString(tammi), 'keskiviikko 1. tammikuuta 2025');
});

test('Kuukaudet: helmikuu', () => {
    assert.equal(finnishDateString(helmi), 'lauantai 1. helmikuuta 2025');
});

test('Kuukaudet: maaliskuu', () => {
    assert.equal(finnishDateString(maalis), 'lauantai 1. maaliskuuta 2025');
});

test('Kuukaudet: huhtikuu', () => {
    assert.equal(finnishDateString(huhti), 'tiistai 1. huhtikuuta 2025');
});

test('Kuukaudet: toukokuu', () => {
    assert.equal(finnishDateString(touko), 'torstai 1. toukokuuta 2025');
});

test('Kuukaudet: kesäkuu', () => {
    assert.equal(finnishDateString(kesä), 'sunnuntai 1. kesäkuuta 2025');
});

test('Kuukaudet: heinäkuu', () => {
    assert.equal(finnishDateString(heinä), 'tiistai 1. heinäkuuta 2025');
});

test('Kuukaudet: elokuu', () => {
    assert.equal(finnishDateString(elo), 'perjantai 1. elokuuta 2025');
});

test('Kuukaudet: syyskuu', () => {
    assert.equal(finnishDateString(syys), 'maanantai 1. syyskuuta 2025');
});

test('Kuukaudet: lokakuu', () => {
    assert.equal(finnishDateString(loka), 'keskiviikko 1. lokakuuta 2025');
});

test('Kuukaudet: marraskuu', () => {
    assert.equal(finnishDateString(marras), 'lauantai 1. marraskuuta 2025');
});

test('Kuukaudet: joulukuu', () => {
    assert.equal(finnishDateString(joulu), 'maanantai 1. joulukuuta 2025');
});