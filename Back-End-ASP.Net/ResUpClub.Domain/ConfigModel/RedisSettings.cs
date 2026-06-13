using System;
using System.Collections.Generic;
using System.Text;

namespace ResUpClub.Domain.ConfigModel
{
	public class RedisSettings
	{
		public string Configuration { get; set; } = string.Empty;
		public string InstanceName { get; set; } = string.Empty;
	}
}
