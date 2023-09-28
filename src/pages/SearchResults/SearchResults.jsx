import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
import LoaderIcon from "../../components/loaderIcon/LoaderIcon";
import { fetchApiData } from "../../utils/api";

const SearchResults = () => {
	const [data, setData] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);
	const { query } = useParams();

	const fetchInitialData = () => {
		setLoading(true);
		fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
			setData(res);
			setPageNum((prev) => prev + 1);
			setLoading(false);
			console.log(res);
		});
	};

	const fetchNextPageData = () => {
		fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
			if (data?.results) {
				setData({
					...data,
					results: [...data?.results, ...res.results],
				});
			} else {
				setData(res);
			}
			setPageNum((prev) => prev + 1);
		});
	};

	useEffect(() => {
		setPageNum(1);
		fetchInitialData();
	}, [query]);

	return (
		<div className="searchResults py-2">
			{loading ? (
				<LoaderIcon size={25} />
			) : (
				<div className="searchcontent w-full max-w-[1200px] mx-auto px-[20px] min-lg:px-[10px] min-sl:max-w-[600px] lg:max-w-[400px]">
					<div className="title my-5">
						<h4 className="text-white text-3xl lg:text-2xl">
							Search Results of '{query}':
						</h4>
					</div>
					<InfiniteScroll
						className="flex flex-row flex-wrap gap-[10px] mb-[50px] min-sl:gap-[20px] lg:row-gap-[15px] lg:column-gap-[60px]"
						dataLength={data?.results?.length || []}
						next={fetchNextPageData}
						hasMore={pageNum <= data?.total_pages}
						loader={<LoaderIcon />}
					>
						{data?.results.map((item, index) => {
							if (item.media_type == "person") return;
							return (
								<MovieCard
									key={index}
									imgUrl={
										item.poster_path == undefined || item.poster_path == null
											? "/no-poster.png"
											: "https://image.tmdb.org/t/p/original" + item.poster_path
									}
									title={item.title == undefined ? item.name : item.title}
									releaseDate={
										item.release_date == undefined
											? item.first_air_date
											: item.release_date
									}
									rating="no"
									mediaType={item.media_type}
									id={item.id}
								/>
							);
						})}
					</InfiniteScroll>
				</div>
			)}
		</div>
	);
};

export default SearchResults;
