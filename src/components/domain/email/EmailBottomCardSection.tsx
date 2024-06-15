import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/hooks/useToast";
import { Input } from "@/components/ui/Input";
import { useReplyEmail } from "@/composables/emails/mutation/useReplyEmail";
import { EmailListResponse } from "@/services/email/listEmails.get";
import { Clipboard, Reply } from "lucide-react";
import { useRef } from "react";

interface Props {
  email: EmailListResponse;
}

export const EmailBottomCardSection = ({ email }: Props) => {
  const { data, status, mutate, error } = useReplyEmail();
  const inputRef = useRef<HTMLInputElement | null>(null);
  function copy(text: string) {
    toast({
      title: "Text copied to clipboard",
      variant: "success",
    });
    navigator.clipboard.writeText(text);
  }

  const replyEmail = () => {
    if (inputRef && inputRef.current) {
      console.log(inputRef.current.value);
      mutate({
        email: email.from,
        emailId: email.emailId,
        message: inputRef.current.value,
      });
    }
  };

  return (
    <div className="flex w-full mt-3 items-center gap-2">
      <Input ref={inputRef} />
      <Button
        size={"icon"}
        onClick={() => {
          replyEmail();
        }}
      >
        <Reply />
      </Button>
      <Button
        size={"icon"}
        onClick={() => copy(email.bodyText.split("--00000")[0])}
      >
        <Clipboard />
      </Button>
    </div>
  );
};
