class AutoJwt
    def initialize(app)
      @app = app
    end
  
    def call(env)
      header = env['HTTP_AUTHORIZATION']
      jwt = header.split(' ')[1] rescue ''
      payload = JWT.decode(
        jwt,
        Rails.application.credentials.jwt_secret,
        true,
        { algorithm: 'HS256' }
      ) rescue nil

      env[:current_user] = User.find(payload[0]['user_id']) if payload

      status, headers, response = @app.call(env)
      [status, headers, response]
    end
end