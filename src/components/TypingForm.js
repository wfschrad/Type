import React, { useState } from 'react'
import gcl from 'graphql-tag';
import { Query } from 'react-apollo';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';


import Radio from './material_blocks/Radio';
import Button from './material_blocks/Button';

export default function TypingForm() {
    const [answers, setAnswers] = useState(new Array(48).fill(null));

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1, 1, 0, 0),
        },
    }));

    const classes = useStyles();


    const QUESTIONS_QUERY = gcl`
    query tQuestionsQuery {
        typingQuestions {
            id
            typeAttributeId
            content
            scoringScalar
        }
    }
    `;

    const handleFormSubmission = () => {
        console.log('form submission hit')
    }

    return (
        <>
            <Query query={QUESTIONS_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error);

                        return (
                            <>
                                {data ? (
                                    <>
                                        <form onSubmit={handleFormSubmission}>
                                            <FormControl component="fieldset" error={error} className={classes.formControl}>
                                                {data.typingQuestions.map((question) => (
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
                }
            </Query>
        </>
    )
}
