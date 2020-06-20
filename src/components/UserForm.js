import React, { Component } from 'react'

import BasicInfoForm from './BasicInfoForm';
import TypeFormWrapper from './TypeFormWrapper';
import TypingForm from './TypingForm';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        age: '',
        gender: '',
        // interestedIn: '', add 'interested in' and 'age range' logic in next phase
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
        const { step, firstName, age, gender, bio } = this.state;
        const values = { firstName, age, gender, bio };

        switch(step) {
            case 1:
                return (
                <BasicInfoForm
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
                />
            )
            case 2:
                return <Confirm
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                values={values}
                />
            case 3:
                return <TypeFormWrapper
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
                />
            case 4:
                return <Success/>
        }
    }
}

export default UserForm
