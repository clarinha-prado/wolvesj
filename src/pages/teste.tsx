import { useState } from "react";

export default function Teste() {
    const [dob, setDob] = useState<string>(null);
    const [age, setAge] = useState("");

    function getAge(birthDate: Date) {
        console.log("data de nascimento::::::::::::::::", birthDate.toUTCString());
        const today = new Date();
        console.log("hoje::::::::::::::::", today);
        console.log("mês atual: ", today.getMonth());
        console.log("mês de nasc:", birthDate.getMonth());

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        let monthAge = m;

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        console.log("age=", age);
        console.log("m=", m);
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

    function testAge() {
        const DateOfBirth = new Date(dob);
        setAge(getAge(DateOfBirth));
    }

    return (
        <form action="/Teste">
            <input type="date" name="dtbirth" onChange={(e) => setDob(e.target.value)} />
            <input type="button" value="Calcular idade" onClick={testAge} />
            <p>{age}</p>
        </form>
    );
}