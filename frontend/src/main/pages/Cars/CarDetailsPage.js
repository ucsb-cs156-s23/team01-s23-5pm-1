import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CarTable from 'main/components/Cars/CarTable';
import { carUtilities } from 'main/utils/carUtils';

export default function CarDetailsPage() {
  let { id } = useParams();

  const response = carUtilities.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Car Details</h1>
        <CarTable cars={[response.car]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
