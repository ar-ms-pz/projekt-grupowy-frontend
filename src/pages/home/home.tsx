import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall/wall-layout';
import { PostsConnector } from './connectors/posts-connector';
import { STRINGS } from '../../strings';
import { Heading } from '../../components/heading/heading';
import { useUserContext } from '../../context/user-context';
import $ from './home.module.scss';
import { Loader } from '../../components/loader/loader';

export const HomePage = () => {
    const user = useUserContext();

    return (
        <WallLayout>
            <Heading
                heading={STRINGS.NEWEST_POSTS}
                isCreateButtonVisible={!!user}
            />
            <Suspense
                fallback={
                    <div className={$.loadingContainer}>
                        <Loader />
                    </div>
                }
            >
                <PostsConnector />
            </Suspense>
        </WallLayout>
    );
};
