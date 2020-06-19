import React, { useState, useEffect } from 'react'
import gcl from 'graphql-tag';
import { Query } from 'react-apollo';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';


import Radio from './material_blocks/Radio';
import Button from './material_blocks/Button';

export default function TypingForm() {
    const [answers, setAnswers] = useState(new Array(48).fill(null));
    const [questions, setQuestions] = useState([]);

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1, 1, 0, 0),
        },
    }));

    const classes = useStyles();


    const QUESTIONS_QUERY = `
    query tQuestionsQuery {
        typingQuestions {
            id
            typeAttributeId
            content
            scoringScalar
        }
    }
    `;

    useEffect(() => {
        (async () => {
            const questionRes = await Axios({
                url: 'http://localhost:8080/graphql',
                method: 'post',
                data: {
                    query: QUESTIONS_QUERY
                }
            });
            const questionData = questionRes.data.data.typingQuestions;
            console.log('questionData (useEffect): ', questionData);

            //randomize questions
            //might be better to randomize once and serve same order to users (bias)
            setQuestions(questionData);
            console.log('questionData (useEffect): ', questionData);

        })();
    }, []);

    const handleFormSubmission = (ev) => {
        ev.preventDefault();
        console.log('form submission hit')
        console.log('answers after submission: ', answers)

        //validate all answers

        if (answers.every(answer => answer)) {
            console.log('form submission: true')
        } else {
            console.log('form submission: false')
            // set helper text
        }

        // calculate scores
        calculateForm();

        //post to db

        // history.push('/home')?
    }

    const calculateForm = () => {

        // grab values, do them calcs
        const attScores = {
            ei: 0,
            ns: 0,
            ft: 0,
            jp: 0
        }
    }


    return (
        <>
            {questions ? (
                <>
                    <form onSubmit={handleFormSubmission}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            {questions.map((question) => (
                                <Radio key={question.id} question={question} answers={answers} setAnswers={setAnswers} />
                            ))}
                            <Button />
                        </FormControl>
                    </form>
                </>
            ) : <div>No Data</div>
            }

        </>
    )
}
