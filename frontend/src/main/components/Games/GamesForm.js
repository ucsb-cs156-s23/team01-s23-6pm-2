import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function GamesForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker enable all
   
    const testIdPrefix = "GamesForm";

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-name"}
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="developer">Developer</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-developer"}
                    id="developer"
                    type="text"
                    isInvalid={Boolean(errors.developer)}
                    {...register("developer", {
                        required: "Developer is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.developer?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="publisher">Publisher</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-publisher"}
                    id="publisher"
                    type="text"
                    isInvalid={Boolean(errors.publisher)}
                    {...register("publisher", {
                        required: "Publisher is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.publisher?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="year">Year</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-year"}
                    id="year"
                    type="text"
                    isInvalid={Boolean(errors.year)}
                    {...register("year", {
                        required: "Year is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.year?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="rating">Rating</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-rating"}
                    id="rating"
                    type="text"
                    isInvalid={Boolean(errors.rating)}
                    {...register("rating", {
                        required: "Rating is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.rating?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default GamesForm;
