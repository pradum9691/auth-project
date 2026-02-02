const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl  via-blue-900 px-4">
      <div className="w-full max-w-md border border-white/20 rounded-2xl p-10 backdrop-blur-xl bg-white/10">
        <div className="text-center mb-10">
          <h1 className="text-white tracking-widest">{title}</h1>
          {subtitle && (
            <p className="text-xs text-white/40 mt-2">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
