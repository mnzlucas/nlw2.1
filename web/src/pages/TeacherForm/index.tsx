import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../Services/api';

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0 , from: '', to: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0 , from: '', to: ''}
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index ) => {
            if( index === position) {
                return { ...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
        }).then(() => {
            alert('Sussessful Registration!');
            history.push('/');
        }).catch(() => {
            alert('Error at the Registration!')
        })
    }
    return(
        <div id="page-teacher-form" className="container">

           <PageHeader
            title="what amazing that you want to teach."
            description= "The first step is to fill out this subscription form"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Your data </legend>

                        <Input  
                        name="name" 
                        label="Full name" 
                        value={name}
                        onChange={(event) => { setName(event.target.value)}}
                        />

                            <Input  
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(event) => { setAvatar(event.target.value)}}
                            />
                                <Input  
                                name="whatsapp" 
                                label="Whatsapp"
                                value={whatsapp}
                                onChange={(event) => { setWhatsapp(event.target.value)}}
                                />
                                        <TextArea  
                                        name="bio" 
                                        label="Biography"
                                        value={bio}
                                        onChange={(event) => { setBio(event.target.value)}}
                                        />

                    </fieldset>

                    <fieldset>
                        <legend>About class </legend>

                        <Select 
                            name="name" 
                            label="Subject"
                            value={subject}
                            onChange={(event) => { setSubject(event.target.value)}}
                            options={[
                                { value: 'Art', label: 'Art'},
                                { value: 'Bio', label: 'Biologhy'},
                                { value: 'Sciences', label: 'Sciences'},
                                { value: 'Sniper', label: 'Sniper Shot'},
                                { value: 'Sniper Gun', label: 'Sniper Gun'},
                                { value: 'Sniper Quick Shot', label: 'Sniper Quick Shot'},
                            ]}

                        />
                        <Input  
                        name="cost" 
                        label="Price per hour"
                        value={cost}
                        onChange={(event) => { setCost(event.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Avaliable schedules
                            <button type="button" onClick={addNewScheduleItem}>
                                + new schedules
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Weekday"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                                        options={[
                                            { value: '0', label: 'Sunday'},
                                            { value: '1', label: 'Monday'},
                                            { value: '2', label: 'Tuesday'},
                                            { value: '3', label: 'Wednesday'},
                                            { value: '4', label: 'Thursday'},
                                            { value: '5', label: 'Friday'},
                                            { value: '6', label: 'Saturday'},
                                        ]}
                                    />    
                                    <Input 
                                    name="from" 
                                    label="From" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                    />

                                    <Input 
                                    name="to" 
                                    label="To" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Notice Important"/>
                            Important! <br />
                            Fill in all the data
                        </p>
                        <button type="submit">
                            save registration
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;