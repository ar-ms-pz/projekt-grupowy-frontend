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
                        <TableHead className="w-[100px]">
                            {STRINGS.ID}
                        </TableHead>
                        <TableHead>{STRINGS.USERNAME}</TableHead>
                        <TableHead>{STRINGS.TYPE}</TableHead>
                        <TableHead>{STRINGS.CREATED}</TableHead>
                        <TableHead>{STRINGS.UPDATED}</TableHead>
                        <TableHead />
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
                                <RelativeDate date={user.updatedAt} />
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
