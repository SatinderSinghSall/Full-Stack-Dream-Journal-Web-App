exports.friendRequestTemplate = (senderName) => `
  <div style="font-family: 'Inter', sans-serif; background: #f6f8fb; padding: 40px;">
    <div style="max-width: 480px; margin: auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); height: 6px;"></div>
      <div style="padding: 40px 30px; text-align: center;">
        <h2 style="color: #111827; margin-bottom: 10px;">✨ Dream Journal Request ✨</h2>
        <p style="color: #6b7280; font-size: 15px; margin-bottom: 25px;">
          <strong>${senderName}</strong> wants to connect with you and become your DreamMate!
        </p>

        <a href="${process.env.FRONTEND_URL}/friends"
           style="display: inline-block; padding: 12px 28px; border-radius: 10px; 
           background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); 
           color: white; text-decoration: none; font-weight: 600; letter-spacing: 0.5px;">
          View Request
        </a>

        <p style="color: #9ca3af; font-size: 13px; margin-top: 35px;">
          You can view or respond to this request anytime from your Dream Journal Friends page.
        </p>
      </div>
      <div style="background: #f9fafb; text-align: center; padding: 16px; font-size: 12px; color: #9ca3af;">
        © ${new Date().getFullYear()} Dream Journal. Dream together, grow together 🌙
      </div>
    </div>
  </div>
`;
