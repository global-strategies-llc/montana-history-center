import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

import Facebook from '../img/social/facebook.svg'
import Twitter from '../img/social/twitter.svg'
import NewsIcon from '../img/news.svg'

import './BlogRoll.scss'

class BlogRoll extends React.Component {
	render() {
		const { data, count, className } = this.props
		const { edges: posts } = data.allMarkdownRemark
		return (
			<section className={ [className, 'blogs', posts.length ? 'section' : ''].join(' ') }>
				<div className="container">
					<div className="columns is-multiline">
						{posts &&
							posts.slice(0, count || Infinity).map(({ node: post }) => (
								<div className="column is-10 is-offset-1" key={post.id}>
									<article className="blog-list-item">
										<div className="blog-item-image">
										{post.frontmatter.featuredimage ?
											<PreviewCompatibleImage
												imageInfo={{
													image: post.frontmatter.featuredimage,
													alt: `Image thumbnail for post ${post.frontmatter.title}`,
												}}
											/>
											: <NewsIcon />
										}
										</div>
										<div className="article-body">
											<header>
												<p className="post-meta">
													<span className="is-size-5">
														{post.frontmatter.date}
													</span>
													{ post.frontmatter.author &&
														<span className="is-size-5">
															By {post.frontmatter.author}
														</span>
													}
												</p>
												<h4 className="is-size-2">
													<Link
														className="title"
														to={post.fields.slug}
													>
														{post.frontmatter.title}
													</Link>
												</h4>
											</header>
											<p className="article-excerpt">
												{post.excerpt}
												<Link className="article-readmore" to={post.fields.slug}>
													Read more
												</Link>
											</p>
											<div className="article-footer">
												<div className="social">
													<a title="facebook" href="https://facebook.com">
														<Facebook />
													</a>
													<a title="twitter" href="https://twitter.com">
														<Twitter />
													</a>
												</div>
											</div>
										</div>
									</article>
								</div>
							))}
					</div>
				</div>
			</section>
		)
	}
}

BlogRoll.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export default ({ count, className }) => (
	<StaticQuery
		query={graphql`
			query BlogRollQuery {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: {
						templateKey: { eq: "blog-post" }
						tags: { nin: "example" }
					} }
				) {
					edges {
						node {
							excerpt(pruneLength: 400)
							id
							fields {
								slug
							}
							frontmatter {
								title
								templateKey
								date(formatString: "MMMM DD, YYYY")
								author
								featuredpost
								featuredimage {
									childImageSharp {
										fluid(maxWidth: 450, quality: 100) {
											...GatsbyImageSharpFluid
										}
									}
								}
							}
						}
					}
				}
			}
		`}
		render={(data) => <BlogRoll data={data} count={count} className={className} />}
	/>
)
