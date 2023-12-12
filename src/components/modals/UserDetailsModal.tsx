import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
interface UserDetailsModalProps {
  isModalOpen: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isModalOpen }) => {
  return (
    <Dialog open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
