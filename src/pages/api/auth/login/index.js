import apiService, { isAxiosError } from '@/utils/apiService'
import { withSessionRoute } from '@/utils/sessionWrapper'

const api = withSessionRoute(async (req, res) => {
	const { username, password } = req.body
	switch (req.method) {
		case 'POST': {
			try {
				const result = await apiService.request({
					method: 'POST',
					url: 'auth/login-admin',
					data: { username, password }
				})
				const { data: _data, status } = result
				const { data, message } = _data
				req.session.auth = {
					username,
					accessToken: data.access_token,
					role_user: data.role_user
				}
				await req.session.save()
				return res.status(status).send({ message })
			} catch (err) {
				if (isAxiosError(err)) {
					const status = err?.response?.status
					const message = err?.response?.data?.message ?? `External Server Error with Status ${status}`
					const errors = err?.response?.data?.errors
					return res.status(status).send({ status, message, data: null, errors })
				} else {
					return res.status(500).send({ status: 500, message: `Internal Server Error ${err}`, data: null })
				}
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
})
export default api
