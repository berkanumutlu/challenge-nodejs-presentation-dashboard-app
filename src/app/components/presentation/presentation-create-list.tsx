import { Plus, Sparkles } from "lucide-react";
import { useModal } from "@/store/useModal";
import { CreatePresentationModal } from "@/components/modals/presentation/create-modal";

export default function PresentationCreateList() {
    const { onModalOpen } = useModal();

    const openCreatePresentationModal = () => {
        onModalOpen('CreatePresentationModal');
    };

    return (
        <>
            <div className="space-y-5 mb-5">
                <h3 className="text-tertiary text-sm font-medium">
                    Create a presentation
                </h3>
                <div className="flex flex-row gap-x-4">
                    <div
                        className="space-y-2 h-40 w-72 flex flex-col justify-center items-center bg-white rounded-sm shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] cursor-pointer"
                        onClick={openCreatePresentationModal}
                    >
                        <div className="p-3 inline-flex text-white bg-primary rounded-sm">
                            <Plus width={25} height={25} />
                        </div>
                        <p className="text-sm font-bold text-primary text-center">
                            Create a new presentation
                        </p>
                    </div>
                    <div className="h-40 w-72 bg-white rounded-sm">
                        <div className="space-x-4 h-full flex flex-col md:flex-row justify-center items-center text-white bg-gradient-to-tr from-primary to-secondary shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] rounded-sm cursor-pointer">
                            <Sparkles />
                            <p className="text-lg font-bold">Create with AI</p>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <CreatePresentationModal />
            </>
        </>
    );
}
