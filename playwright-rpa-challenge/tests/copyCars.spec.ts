import { test } from '@playwright/test';

const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/dashboard.php/";
//const legacySystem = "https://rpa-exercise-legacy-system.pages.dev/";
const targetSystem = "https://rpa-exercise-target-system.pages.dev/";

class Car {
    constructor(
        public license: string,
        public make: string,
        public model: string,
        public year: number,
        public mileage: number,
        public owner: string,
        public color: string,
        public streetLegal: boolean
    ) {}
}


test('copy cars from legacy system to the new one', async ({ page, context, browser }) => {    
    // Luodaan autoille lista
    let listOfCars: Car[] = [];
    await page.waitForSelector('body'); 
    await page.goto(legacySystem);
    await page.waitForSelector('table');

    const rows = await page.locator('table tr').all(); //Haetaan autot-taulukon kaikki rivit
    const filteredRows = rows.slice(1); // Jätetään ensimmäinen (otsikko)rivi pois

    // Lokitetaan tietoja kehityksen aikana
    console.log("Rivit:", rows);
    console.log("Rivejä:", rows.length);
    const rowTexts = await page.locator('table tr').allTextContents();
    console.log("Rivien sisältö:", rowTexts);

    for (const row of filteredRows) {
        // muuttujat tallennettaville auton tiedoille
        let license = "";
        let make = "";
        let model = "";
        let year = 0;
        let mileage = 0;
        let owner = "";
        let color = "";
        let streetLegal = false 
        
        const cells = await row.locator('td').allTextContents(); // Hakee rivin kaikki solut
        console.log("Rivin solut ilman ensimmäistä riviä:", cells);
        let filteredCells = cells.slice(0, -1); // Jätetään rivin viimeinen solu pois (painike)
        console.log("Rivin tiedot:", filteredCells);
        let rowName = filteredCells.join(" ").trim(); // Yhdistetään kaikki solut yhdeksi merkkijonoksi
        console.log("Rivin nimi:", rowName);

        await page.getByRole('row', { name: rowName }).getByRole('button').click();

        // Haetaan tiedot General-välilehdeltä
        await page.getByRole('tab', { name: 'General' }).click();
        license = (await page.getByRole('group', { name: 'License plate' }).textContent() ?? "").replace("License plate", "").trim();
        make = (await page.getByRole('group', { name: 'Make' }).textContent() ?? "").replace("Make", "").trim();
        model = (await page.getByRole('group', { name: 'Model' }).textContent() ?? "").replace("Model", "").trim();
        let yearText = (await page.getByRole('group', { name: 'Year' }).textContent() ?? "").replace("Year", "").trim();
        year = yearText ? parseInt(yearText.trim()) : 0;
        color = (await page.getByRole('group', { name: 'Color' }).textContent() ?? "").replace("Color", "").trim();

        // Haetaan tiedot Usage-välilehdeltä
        await page.getByRole('tab', { name: 'Usage' }).click();
        mileage = parseInt(await page.getByRole('spinbutton').inputValue() ?? "0");
        owner = (await page.getByRole('group', { name: 'Owner' }).textContent() ?? "").replace("Owner", "").trim();
        
        if (await page.getByTestId('checkmarkIcon').count() > 0) {
            streetLegal = await page.getByTestId('checkmarkIcon').isChecked();
        }
        console.log("StreetLegal checkboxin tila:", streetLegal);

        await page.getByRole('button', { name: 'Close' }).click();
        
        // Luodaan yksittäinen auto-olio
        let carToBeAdded = new Car(license, make, model, year, mileage, owner, color, streetLegal);
        // Lisätään auto-olio listaan
        listOfCars.push(carToBeAdded);
    }
    
    await page.waitForSelector('body'); 
    await page.goto(targetSystem);

    // Loopataan listan läpi ja lisätään autot uuteen järjestelmään
    for (let i = 0; i < listOfCars.length; i++) {
        // Luodaan auto-olio
        let car = listOfCars[i];
        // Lisätään auton tiedot uuteen järjestelmään
        await page.getByRole('textbox', { name: 'License plate' }).fill(car.license);
        await page.getByRole('textbox', { name: 'Make' }).fill(car.make);
        await page.getByRole('textbox', { name: 'Model' }).fill(car.model);
        await page.getByRole('textbox', { name: 'Year' }).fill(car.year.toString());
        await page.getByRole('textbox', { name: 'Mileage' }).fill(car.mileage.toString());
        await page.getByRole('textbox', { name: 'Owner name' }).fill(car.owner);
        await page.getByRole('textbox', { name: 'Color' }).fill(car.color);
        if (car.streetLegal) {
            await page.getByRole('checkbox', { name: 'Street Legal' }).check();
        } 
        await page.getByRole('button', { name: '💾 Save' }).click();
        await page.getByText('was added successfully').click();
    }

});
