import React, { useState, useEffect } from 'react'
import gcl from 'graphql-tag';
import { Query } from 'react-apollo';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";



import Radio from './material_blocks/Radio';
import Button from './material_blocks/Button';
import Modal from '@material-ui/core/Modal';

export default function TypingForm({ values }) {
    const [answers, setAnswers] = useState(new Array(48).fill(null));
    const [questions, setQuestions] = useState([]);
    const { user } = useAuth0();


    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1, 1, 0, 0),
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
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
            console.log('values: ', values)
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
        const attScores = [['ei', 0], ['ns', 0], ['ft', 0], ['jp', 0]];

        if (!answers.every(answer => answer)) {
            console.log('not all answers complete in score calculation');
            return;
        }

        const scoreAnswers = [...answers];

        scoreAnswers.forEach((answer, i) => {
            const relScore = (answer === 'Agree') ? 1 : -1;

            //index into score field for index that matches attribute category
            attScores[questions[i].typeAttributeId - 1][1] += relScore * questions[i].scoringScalar;
        })
        postScoresToUser(attScores);
    }

    const postScoresToUser = async (scores) => {
        console.log('scores: ', scores)
        const SCORE_QUERY = `
        mutation onBoardUser{
            onBoardUser(
                firstName: "${values.firstName}", 
                email: "${user.email}", 
                gender: "${values.gender}", 
                age: ${values.age}, 
                bio: "${values.bio}", 
                rawEI: ${scores[0][1]}, 
                rawNS: ${scores[1][1]}, 
                rawFT: ${scores[2][1]}, 
                rawJP: ${scores[3][1]})
                {
              firstName
              id
              pTypeId
              rawEI
              rawNS
              rawFT
              rawJP
                
            }
          }
        `;
        console.log('score query: ', SCORE_QUERY)
        //use axios to post scores via mutation

        const onBoardRes = await Axios({
            url: 'http://localhost:8080/graphql',
            method: 'post',
            data: {
                query: SCORE_QUERY
            }
        });
        const scoreData = onBoardRes.data.data;

        console.log('data after score post: ', scoreData)
    }



    return (
        <>
            {questions && questions.length > 0 ? (
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
            ) : <div>Loading...</div>
            }

        </>
    )
}
