import React, { useState, FormEvent } from 'react';

import api from '../../Services/api';
import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select';

import './styles.css';


function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(event: FormEvent) {
        event.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title="These are the available 'Proffs'.">
            <form id="search-teachers" onSubmit ={searchTeachers} >
            <Select 
                        name="name" 
                        label="Subject"
                        value={subject}
                        onChange={(event) => {setSubject(event.target.value)}}
                        options={[
                            { value: 'Art', label: 'Art'},
                            { value: 'Bio', label: 'Biologhy'},
                            { value: 'Sciences', label: 'Sciences'},
                            { value: 'Sniper', label: 'Sniper Shot'},
                            { value: 'Sniper Gun', label: 'Sniper Gun'},
                            { value: 'Sniper Quick Shot', label: 'Sniper Quick Shot'},
                        ]}

                      />
            <Select 
                        name="week_day" 
                        label="Weekday"
                        value={week_day}
                        onChange={(event)=> {setWeekday(event.target.value)}}
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
                type="time" 
                name="time" 
                label="Time"
                value={time}
                onChange={(event) => {setTime(event.target.value)}}
                 />
                 <button type="submit">
                     Search
                 </button>
           
            </form>
            </PageHeader>
            
            <main>
                {teachers.map ((teacher:Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}  />
                })}

            </main>
        </div>
    )
}

export default TeacherList;