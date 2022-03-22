import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){
    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectData || {})

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
        metlhod:"GET",
        headers: {
            'Content-Type':'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //connsole.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]:e.target.value})
        console.log(project)
    }

    function handleSelect(e){
        setProject({...project, category:{
                id:e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
        console.log(project)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type="numer"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                text="Selecione a Categoria"
                name="categoru_id"
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}
            />
            <Submit text={btnText}/>
            
        </form>
    )    
}

export default ProjectForm