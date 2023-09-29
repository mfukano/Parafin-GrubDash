import Fastify from "fastify"
import fetch from "node-fetch"
import "dotenv/config"

const fastify = Fastify({
  logger: true
})

/**
 * Auth consts
 */
const username = process.env.PARAFIN_CLIENT_ID
const password = process.env.PARAFIN_CLIENT_SECRET
const authToken = "Basic " + Buffer.from(`${username}:${password}`).toString("base64")

/**
 * Server setup consts
 */
const port = process.env.PORT || 8000

/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          parafinToken: { type: "string" }
        }
      },
      '4xx': {
        type: "object",
        properties: {
          error: {
            type: "boolean"
          },
          errorMessage: {
            type: "string"
          }
        }
      }
    }
  }
}

fastify.get("/parafin/token/:id", async (req, res) => {
  const endpoint = "https://api.parafin.com/v1/auth/redeem_token"
  const parafinPersonId = req.params.id
  const body = { person_id: parafinPersonId }
  console.log(`GET [parafin/token/:id] {parafinPersonId}: ${parafinPersonId}`)
  

  try {
    const result = await fetch(endpoint, {
      method: "post",
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 
        "Authorization": authToken,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log(res)
      }
      return res.json()
    })

    if (result && result.bearer_token) {
      return { parafinToken: result.bearer_token }
    }
  } catch (err) {
    console.log(`ERROR: [${err}]`)
    return { error: true, errorMessage: err }
  }
})

const start = async () => {
  await fastify.listen({ port }, (err, address) => { 
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`🚀 Server started on [${address}]! 🚀`)
  })
}

start()

