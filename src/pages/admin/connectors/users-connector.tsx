import { useUsers } from '@/api/users/use-users';
import { RelativeDate } from '@/components/relative-date/relative-date';
import { capitalize } from '../../../utils/capitalize';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/pagination';
import { EditUserDialog } from '@/components/edit-user-dialog';
import { Button } from '@/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { DeleteUserDialog } from '@/components/delete-user-dialog';
import { Trash2 } from 'lucide-react';

const STRINGS = {
    ID: 'ID',
    USERNAME: 'Username',
    TYPE: 'Type',
    CREATED: 'Created',
    UPDATED: 'Updated',
};

export const UsersConnector = () => {
    const { data } = useUsers();

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">{STRINGS.ID}</TableHead>
                        <TableHead>{STRINGS.USERNAME}</TableHead>
                        <TableHead>{STRINGS.TYPE}</TableHead>
                        <TableHead>{STRINGS.CREATED}</TableHead>
                        <TableHead>{STRINGS.UPDATED}</TableHead>
                        <TableHead className="w-24" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{capitalize(user.type)}</TableCell>
                            <TableCell>
                                <RelativeDate date={user.createdAt} />
                            </TableCell>
                            <TableCell>
                                <RelativeDate date={user.updatedAt} />
                            </TableCell>
                            <TableCell>
                                <EditUserDialog userId={user.id}>
                                    <Button size="icon" variant="ghost">
                                        <Pencil1Icon />
                                    </Button>
                                </EditUserDialog>
                                <DeleteUserDialog userId={user.id}>
                                    <Button size="icon" variant="destructive">
                                        <Trash2 />
                                    </Button>
                                </DeleteUserDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    linkTo="/admin"
                />
            </Table>
        </div>
    );
};
