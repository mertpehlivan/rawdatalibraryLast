import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';


export default function EducationDegreeSelect({ select, setSelect }) {
    const [selectedDegree, setSelectedDegree] = useState(select ? { label: select } : null);
    const [options, setOptions] = useState(educationDegrees);

    useEffect(() => {
        if (select) {
            setSelectedDegree({ label: select });
        }
    }, [select]);

    // Tüm kelimeleri büyük harf yapma fonksiyonu
    const capitalizeWords = (string) => {
        return string
    };

    const handleChange = (event, newValue) => {
        const inputValue = typeof newValue === 'string' ? newValue : newValue?.label;

        // Yeni bir değer girildiyse ve mevcut seçeneklerde yoksa ekle
        if (inputValue) {
            const capitalizedInput = capitalizeWords(inputValue);
            if (!options.some(option => option.label === capitalizedInput)) {
                const newOption = { label: capitalizedInput };
                setOptions(prevOptions => [...prevOptions, newOption]);
                setSelectedDegree(newOption);
                setSelect(capitalizedInput);
            } else {
                const selectedOption = options.find(option => option.label === capitalizedInput);
                setSelectedDegree(selectedOption);
                setSelect(capitalizedInput);
            }
        } else {
            setSelectedDegree(null);
            setSelect('');
        }
    };

    const handleInputChange = (event, value) => {
        const capitalizedValue = capitalizeWords(value);
        setSelectedDegree({ label: capitalizedValue });
        setSelect(capitalizedValue);
    };

    return (
        <Autocomplete
            size='small'
            style={{ width: "100%" }}
            id="education-degree-select"
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            value={selectedDegree}
            onChange={handleChange}
            onInputChange={handleInputChange} // Giriş değiştiğinde çağrılır
            getOptionLabel={(option) => option.label}
            freeSolo // Kullanıcıların elle yazmasına izin verir
            renderOption={(props, option) => (
                <li {...props}>
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Education Degree"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // otomatik tamamlama ve doldurma işlemlerini devre dışı bırak
                    }}
                />
            )}
        />
    );
}



// Updated data for education degrees
const educationDegrees = [
    { "label": "Bachelor of Applied Science", "name": "bachelor_of_applied_science" },
    { "label": "Bachelor of Arts", "name": "bachelor_of_arts" },
    { "label": "Bachelor of Business Administration", "name": "bachelor_of_business_administration" },
    { "label": "Bachelor of Engineering", "name": "bachelor_of_engineering" },
    { "label": "Bachelor of Fine Arts", "name": "bachelor_of_fine_arts" },
    { "label": "Bachelor of Laws", "name": "bachelor_of_laws" },
    { "label": "Bachelor of Medicine", "name": "bachelor_of_medicine" },
    { "label": "Bachelor of Pharmacy", "name": "bachelor_of_pharmacy" },
    { "label": "Bachelor of Philosophy", "name": "bachelor_of_philosophy" },
    { "label": "Bachelor of Science", "name": "bachelor_of_science" },
    { "label": "Bachelor of Social Work", "name": "bachelor_of_social_work" },
    { "label": "Bachelor of Technology", "name": "bachelor_of_technology" },
    { "label": "Bachelor of Veterinary Science", "name": "bachelor_of_veterinary_science" },
    { "label": "Diplom", "name": "diplom" },
    { "label": "Doctor of Applied Science", "name": "doctor_of_applied_science" },
    { "label": "Doctor of Arts", "name": "doctor_of_arts" },
    { "label": "Doctor of Business Administration", "name": "doctor_of_business_administration" },
    { "label": "Doctor of Dental Surgery", "name": "doctor_of_dental_surgery" },
    { "label": "Doctor of Education", "name": "doctor_of_education" },
    { "label": "Doctor of Engineering", "name": "doctor_of_engineering" },
    { "label": "Doctor of Fine Arts", "name": "doctor_of_fine_arts" },
    { "label": "Doctor of Medicine", "name": "doctor_of_medicine" },
    { "label": "Doctor of Nursing Practice", "name": "doctor_of_nursing_practice" },
    { "label": "Doctor of Osteopathic Medicine", "name": "doctor_of_osteopathic_medicine" },
    { "label": "Doctor of Pharmacy", "name": "doctor_of_pharmacy" },
    { "label": "Doctor of Philosophy", "name": "doctor_of_philosophy" },
    { "label": "Doctor of Psychology", "name": "doctor_of_psychology" },
    { "label": "Doctor of Public Health", "name": "doctor_of_public_health" },
    { "label": "Doctor of Public Therapy", "name": "doctor_of_public_therapy" },
    { "label": "Doctor of Theology", "name": "doctor_of_theology" },
    { "label": "Doctor of Veterinary Medicine", "name": "doctor_of_veterinary_medicine" },
    { "label": "Juric Doctor", "name": "juric_doctor" },
    { "label": "Magister", "name": "magister" },
    { "label": "Master of Arts", "name": "master_of_arts" },
    { "label": "Master of Business Administration", "name": "master_of_business_administration" },
    { "label": "Master of Dental Surgery", "name": "master_of_dental_surgery" },
    { "label": "Master of Education", "name": "master_of_education" },
    { "label": "Master of Engineering", "name": "master_of_engineering" },
    { "label": "Master of Medicine", "name": "master_of_medicine" },
    { "label": "Master of Nursing Practice", "name": "master_of_nursing_practice" },
    { "label": "Master of Osteopathic Medicine", "name": "master_of_osteopathic_medicine" },
    { "label": "Master of Pharmacy", "name": "master_of_pharmacy" },
    { "label": "Master of Philosophy", "name": "master_of_philosophy" },
    { "label": "Master of Psychology", "name": "master_of_psychology" },
    { "label": "Master of Public Health", "name": "master_of_public_health" },
    { "label": "Master of Public Therapy", "name": "master_of_public_therapy" },
    { "label": "Master of Theology", "name": "master_of_theology" },
    { "label": "Post-Doc", "name": "post_doc" },
    { "label": "Adjunct", "name": "adjunct" },
    { "label": "Graduate Student", "name": "graduate_student" },
    { "label": "Master Student", "name": "master_student" },
    { "label": "PhD Student", "name": "phd_student" },
    { "label": "Post Doctorate", "name": "post_doctorate" },
    { "label": "Post Doctorate Student", "name": "post_doctorate_student" },
    { "label": "Undergraduate Student", "name": "undergraduate_student" },
    { "label": "Visiting Undergraduate Student", "name": "visiting_undergraduate_student" },
    { "label": "Visiting Master Student", "name": "visiting_master_student" },
    { "label": "Visiting Lecturer", "name": "visiting_lecturer" },
    { "label": "Visiting Lecturer (Dr.)", "name": "visiting_lecturer_dr" },
    { "label": "Visiting Researcher (PhD)", "name": "visiting_researcher_phd" }
]
