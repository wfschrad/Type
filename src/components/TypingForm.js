import React, { useState } from 'react'
import gcl from 'graphql-tag';
import { Query } from 'react-apollo';

import Radio from './material_blocks/Radio';
import Button from './material_blocks/Button';

export default function TypingForm() {
    const [answers, setAnswers] = useState(new Array(48).fill(null));

    const QUESTIONS_QUERY = gcl`
    query tQuestionsQuery {
        typingQuestions {
            typeAttributeId
            content
            scoringScalar
        }
    }
    `;

    const handleSubmit = () => {
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
                                        <form onSubmit={handleSubmit}>

                                            {data.typingQuestions.map((question) => (
                                                <Radio key={question.id} content={question.content} />

                                            ))}

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
