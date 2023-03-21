import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function TechnicianSideBar() {
    const [date, setDate] = useState('');
    const [state, setState] = useState('');
    const [search, setSearch] = useState('');

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: implement filter logic
    };

    return (
        <div className="tech-sidebar">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={handleDateChange} />
                </Form.Group>

                <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Select value={state} onChange={handleStateChange}>
                        <option value="">-- Select State --</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="NY">New York</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formSearch">
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Enter search term" value={search} onChange={handleSearchChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Filter
                </Button>
            </Form>
        </div>
    );
}