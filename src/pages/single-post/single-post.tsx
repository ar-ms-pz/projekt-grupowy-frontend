import { Suspense } from 'react';
import { SinglePostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';
import { Loader } from '../../components/loader/loader';
import $ from './single-post.module.scss';

export const SinglePostPage = () => {
    const { postId } = useParams({
        from: '/posts/$postId',
    });

    return (
        <Suspense
            fallback={
                <div className={$.loadingContainer}>
                    <Loader />
                </div>
            }
        >
            <SinglePostConnector id={+postId} />
        </Suspense>
    );
};
