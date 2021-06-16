export function getAge(dob: Date) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    let monthAge = m;

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age === 0) {
        if (m < 0) {
            monthAge = 12 + m;
        } else {
            monthAge = m;
        }
    }

    if (age === 0) {
        return monthAge === 1 ? (monthAge + " mês") : (monthAge + " meses");
    } else {
        return age === 1 ? (age + " ano") : (age + " anos");
    }
}

