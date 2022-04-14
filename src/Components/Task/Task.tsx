import React, {ChangeEvent, useCallback} from 'react'
import s from "./Task.module.css";
import {EditableSpan} from '../RenameSpanFunc/EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../api/todolists-api'
import {TaskTypeWithStatusEntity} from "../../Redux-Store/tasks-reducer";

type TaskPropsType = {
    task: TaskTypeWithStatusEntity
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const disabled = props.task.entityTaskStatus === 'loading' ;

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.is_done : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="secondary"
            onChange={onChangeHandler}
        />

        <EditableSpan disabled={disabled} value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler} disabled={disabled}>
            <Delete/>
        </IconButton>
    </div>
})
