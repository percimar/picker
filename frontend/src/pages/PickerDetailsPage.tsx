import { Button } from "@/components/ui/Button";
import { LinkToCopy } from "@/components/ui/LinkToCopy";
import { BASE_URL } from "@/lib/constants";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const PickerDetailsPage = () => {
  const { pickerId } = useParams();
  const navigate = useNavigate();
  // const [picker, setPicker] = useState<Picker>();

  // useEffect(() => {
  //   (async () => {
  //     if (!pickerId) return navigate("/");
  //     const picker = await getPickerData(pickerId);
  //     setPicker(picker);
  //   })();
  // }, [pickerId]);

  return (
    <div className="root-container">
      <div className="space-y-4 md:space-y-8">
        <div className="text-2xl font-semibold tracking-tight">
          Picker Details
        </div>
        {/* {picker ? ( */}
        <>
          <LinkToCopy
            label="Voter Link"
            value={`${BASE_URL}/${pickerId}/vote`}
          />
          <LinkToCopy
            label="Results Link"
            value={`${BASE_URL}/${pickerId}/result`}
          />
        </>
        {/* ) : (
          <>
            <Skeleton className="h-16 w-full opacity-60" />
            <Skeleton className="h-16 w-full opacity-60" />
          </>
        )} */}
        <Button
          type="button"
          variant="outline"
          className="bg-transparent"
          onClick={() => navigate(import.meta.env.BASE_URL)}
        >
          <ArrowLeftIcon />
          Create Picker
        </Button>
      </div>
    </div>
  );
};
