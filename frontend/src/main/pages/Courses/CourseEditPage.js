
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { courseUtils }  from 'main/utils/courseUtils';
import CourseForm from 'main/components/Courses/CourseForm';
import { useNavigate } from 'react-router-dom'


export default function CourseEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = courseUtils.getById(id);

    const onSubmit = async (course) => {
        const updatedCourse = courseUtils.update(course);
        console.log("updatedCourse: " + JSON.stringify(updatedCourse));
        navigate("/courses");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Course</h1>
                <CourseForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.course}/>
            </div>
        </BasicLayout>
    )
}