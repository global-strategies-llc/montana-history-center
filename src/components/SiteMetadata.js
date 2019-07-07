import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
	const { site } = useStaticQuery(
		graphql`
			query SITE_METADATA_QUERY {
				site {
					siteMetadata {
						title
						description
						siteCreator {
							name
							url
						}
						menuLinks {
							name
							placement
							url
						}
						socialLinks {
							facebook
							twitter
						}
					}
				}
			}
		`
	)
	return site.siteMetadata
}

export default useSiteMetadata
