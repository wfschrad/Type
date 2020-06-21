import React, { Component } from 'react'

import BasicInfoForm from './BasicInfoForm';
import TypingForm from './TypingForm';

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        age: '',
        gender: '',
        interestedIn: '',
        bio: ''
    }

    // Proceed to next step

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Retrace to previous step

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => ev => {
        this.setState({ [input]: ev.target.value });
    }

    render() {
        const { step } = this.state;
        const { firstName, occupation, city, bio } = this.state;
        const values = { firstName, occupation, city, bio };

        switch(step) {
            case 1:
                return (
                <BasicInfoForm
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
                />
            )
            case 2:
                return <TypingForm/>
            case 3:
                return <h1>Confirm</h1>
            case 4:
                return <h1>Confirm</h1>
        }
    }
}

export default UserForm
