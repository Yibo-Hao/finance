class AutoJwt
    def initialize(app)
      @app = app
    end
  
    def call(env)
      return @app.call(env) if ['/api/v1/sessions', '/api/v1/validation_codes'].include? env['PATH_INFO']

      header = env['HTTP_AUTHORIZATION']
      jwt = header.split(' ')[1] rescue ''

      begin
        payload = JWT.decode(
          jwt,
          Rails.application.credentials.jwt_secret,
          true,
          { algorithm: 'HS256' }
        )
      rescue JWT::ExpiredSignature
        return [401, { 'Content-Type' => 'application/json' }, [{ error: 'Expired token' }.to_json]]
      end

      env[:current_user] = User.find(payload[0]['user_id']) if payload
      status, headers, response = @app.call(env)
      [status, headers, response]
    end
end