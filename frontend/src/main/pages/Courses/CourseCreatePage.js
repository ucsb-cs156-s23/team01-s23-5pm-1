import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseForm from "main/components/Courses/CourseForm";
import { useNavigate } from 'react-router-dom'
import { courseUtils } from 'main/utils/courseUtils';

export default function CourseCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (course) => {
    const createdCourse = courseUtils.add(course);
    console.log("createdCourse: " + JSON.stringify(createdCourse));
    navigate("/courses");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Course</h1>
        <CourseForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
