import { Button } from '../button/button';
import $ from './heading.module.scss';
import { Plus } from 'lucide-react';
import { PostModal } from '../post-modal/post-modal';

type Props = {
    heading: string;
    isCreateButtonVisible?: boolean;
};

const STRINGS = {
    ADD_POST: 'Add Post',
};

export const Heading = ({ heading, isCreateButtonVisible }: Props) => {
    return (
        <>
            <div className={$.container}>
                <h1 className={$.heading}>{heading}</h1>
                {isCreateButtonVisible && (
                    <PostModal
                        trigger={
                            <Button variant="primary">
                                {STRINGS.ADD_POST}
                                <Plus size={20} />
                            </Button>
                        }
                    />
                )}
            </div>
        </>
    );
};
