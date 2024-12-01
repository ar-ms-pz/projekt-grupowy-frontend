import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall/wall-layout';
import { PostsConnector } from './connectors/posts-connector';
import { Loader } from '../../components/loader/loader';
import { FilterPanel } from '@/components/filter-panel';
import { MapPointsConnector } from './connectors/map-connector';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Map } from '@/components/map/map';
import { AddressSearch } from '@/components/address-search';
import { RadiusConnector } from './connectors/radius-connector';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { BREAKPOINTS } from '@/config';

export const SearchPage = () => {
    const isMobile = useMediaQuery(BREAKPOINTS.lg);

    const orientation = isMobile ? 'vertical' : 'horizontal';

    return (
        <WallLayout>
            <ResizablePanelGroup
                direction={isMobile ? 'vertical' : 'horizontal'}
            >
                <ResizablePanel minSize={isMobile ? 8 : 30}>
                    <AddressSearch />
                    <Map
                        className="h-[calc(100vh-8.25rem)] w-full"
                        orientation={orientation}
                    >
                        <Suspense>
                            <MapPointsConnector />
                            <RadiusConnector />
                        </Suspense>
                    </Map>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={isMobile ? 0 : 50}>
                    <div className="relative w-full">
                        <div className="absolute px-6 overflow-auto h-[calc(100vh-4rem)] color-scheme-light dark:color-scheme-dark w-full">
                            <div className="sticky top-0 z-30 bg-background">
                                <FilterPanel />
                            </div>
                            <Suspense
                                fallback={
                                    <div className="w-full h-[calc(100vh-8.25rem)] flex justify-center items-center">
                                        <Loader />
                                    </div>
                                }
                            >
                                <PostsConnector />
                            </Suspense>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </WallLayout>
    );
};
