function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('result');
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter valid height and weight values.</p>';
        return;
    }
    
    const bmi = weight / (height * height);
    const category = getBMICategory(bmi);
    
    resultDiv.innerHTML = `
        <h2>Your BMI: ${bmi.toFixed(2)}</h2>
        <p class="category ${category.class}">${category.text}</p>
    `;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return { text: 'Underweight', class: 'underweight' };
    } else if (bmi < 25) {
        return { text: 'Normal weight', class: 'normal' };
    } else if (bmi < 30) {
        return { text: 'Overweight', class: 'overweight' };
    } else {
        return { text: 'Obese', class: 'obese' };
    }
}


