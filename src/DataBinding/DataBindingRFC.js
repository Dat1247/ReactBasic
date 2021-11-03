import React from 'react'


const student = {
        name: 'Ho A',
        age: 20
    }

export default function DataBindingRFC() {

    const name = 'Quan Dat';

    return (
        <div>
            <h1>React Functional Component - Data Binding</h1>

            <hr />

            <h1 className="text-danger">{name}</h1>
            <h3>name: {student.name} - age: {student.age}</h3>
        </div>
    )
}
