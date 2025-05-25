import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { GoGift } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";
import eventService from "../../../services/eventService";
import { toast } from "react-toastify";

const EventEdit = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (!eventId) {
      toast.error("Event ID is required");
      navigate("/events-manage");
      return;
    }
    fetchEventDetails();
  }, [eventId, navigate]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEventById(eventId!);

      if (response.success && response.data) {
        setTitle(response.data.title);
        setDescription(response.data.description);
      } else {
        toast.error(response.message || "Failed to load event details");
        navigate("/events-manage");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to load event details. Please try again.");
      navigate("/events-manage");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !eventId) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await eventService.updateEvent(eventId, {
        title,
        description,
      });

      if (response.success) {
        toast.success("Event updated successfully!");
        // Navigate back to events list
        navigate("/events-manage");
      } else {
        toast.error(response.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(
        "An error occurred while updating the event. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#171022] w-full min-h-screen p-5 flex items-center justify-center">
        <div className="text-white text-xl">Loading event details...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#171022] w-full min-h-screen p-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white mb-3 opacity-80 cursor-pointer"
        >
          <BiArrowBack /> Back
        </button>
        <h3 className="text-3xl text-[#ffffffe5] mb-1">Edit Event</h3>

        <form onSubmit={handleSubmit} className="mt-5 text-white">
          <div className="mb-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              rows={9}
              className={`border w-full placeholder:text-sm placeholder:text-[#6a696b] mt-3 rounded-lg border-${
                errors.description ? "red-500" : "[#625d69]"
              } p-3 bg-transparent`}
              placeholder="Write Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Updating..."
            ) : (
              <>
                <GoGift className="text-white mr-2" />
                Update Event
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EventEdit;
