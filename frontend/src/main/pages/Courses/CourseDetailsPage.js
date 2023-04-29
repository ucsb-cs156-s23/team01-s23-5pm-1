import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CourseTable from 'main/components/Courses/CourseTable';
import { courseUtils } from 'main/utils/courseUtils';

export default function CourseDetailsPage() {
  let { id } = useParams();

  const response = courseUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Course Details</h1>
        <CourseTable courses={[response.course]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
